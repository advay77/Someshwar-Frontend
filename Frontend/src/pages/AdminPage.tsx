import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Download, Search, Filter, IndianRupee, Eye, CheckCircle, Clock, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { getAllBookings } from "@/utils/api";
import { Booking } from "@/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function AdminPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true); // Set loading true at the start of fetch
        const response = await getAllBookings(currentPage, selectedDate, statusFilter);
        if (response.ok) {
          const data = await response.json();
          setBookings(data.bookings);
          setTotalPages(data.totalPages);
        } else {
          toast({
            title: "Error fetching bookings",
            description: "Something went wrong. Please try again later.",
            variant: "destructive"
          })
        }
      } catch (error) {
        toast({
          title: "Error fetching bookings",
          description: "Something went wrong. Please try again later.",
          variant: "destructive"
        })
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [toast, currentPage, selectedDate, statusFilter]);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      const currentMonth = new Date().getMonth() + 1; // JS months are 0-indexed
      const currentYear = new Date().getFullYear();
      try {
        // Fetch all completed bookings for the current month/year
        const response = await getAllBookings(1, "", "completed", currentMonth.toString(), currentYear.toString());
        if (response.ok) {
          const data = await response.json();
          const revenue = data.bookings.reduce((sum, b) => sum + b.amount, 0);
          setMonthlyRevenue(revenue);
        } else {
          console.error("Error fetching monthly revenue");
        }
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
      }
    };
    fetchMonthlyRevenue();
  }, []); // Run only once on mount

  const displayedBookings = useMemo(() => {
    return bookings.filter((booking) =>
      booking.devoteeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.poojaType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bookings, searchTerm]);

  const stats = useMemo(() => {
    const total = bookings.length; // Total from current API fetch
    const confirmed = bookings.filter((b) => b.paymentStatus.toLowerCase() === "completed").length;
    const pending = bookings.filter((b) => b.paymentStatus.toLowerCase() === "pending").length;
    const completed = confirmed; // Assuming completed and confirmed are the same here
    return { total, confirmed, pending, completed };
  }, [bookings]);

  const handleDownloadReport = () => {
  // Use landscape orientation ('l') to fit more columns
  const doc = new jsPDF('l', 'mm', 'a4');
  const dateStr = selectedDate || new Date().toISOString().split('T')[0];

  // 1. Header Styling
  doc.setFontSize(20);
  doc.setTextColor(210, 105, 30); // Saffron color
  doc.text("Pooja Preparation Schedule", 14, 15);
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`Date: ${dateStr}`, 14, 22);
  doc.text(`Prepared for: Pandit Ji / Priest Office`, 14, 28);

  // 2. Prepare Data from your Booking Interface
  const tableRows = displayedBookings.map((b, index) => [
    index + 1,
    b.devoteeName,
    b.gotra || "N/A", // Added Gotra
    b.poojaType,
    b.poojaMode,      // Added Mode (Online/Physical)
    b.spReq || "None", // Added Special Requirements
    b.phone,
    b.paymentStatus === "Completed" ? "Paid" : "Unpaid"
  ]);

  // 3. Generate the Table with specific Pandit-friendly headers
  autoTable(doc, {
    startY: 35,
    head: [[
      'S.No', 
      'Devotee Name', 
      'Gotra', 
      'Pooja Type', 
      'Mode', 
      'Special Instructions', 
      'Contact', 
      'Payment'
    ]],
    body: tableRows,
    theme: 'grid',
    headStyles: { 
      fillColor: [210, 105, 30], 
      halign: 'center',
      fontSize: 11 
    },
    columnStyles: {
      0: { cellWidth: 12 }, // S.No
      1: { fontStyle: 'bold' }, // Name
      2: { cellWidth: 25 }, // Gotra
      5: { cellWidth: 50 }, // Special Req (Needs more space)
    },
    styles: { 
      fontSize: 9,
      cellPadding: 3 
    },
    didParseCell: (data) => {
      // Color code the "Mode" to help Pandit Ji differentiate Online vs Physical
      if (data.section === 'body' && data.column.index === 4) {
        const mode = data.cell.raw?.toString().toLowerCase();
        if (mode === 'online') data.cell.styles.textColor = [0, 102, 204];
      }
    }
  });

  // 4. Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
  }

  // 5. Save
  doc.save(`Pandit_Ji_Schedule_${dateStr}.pdf`);
  
  toast({
    title: "PDF Downloaded",
    description: "Gotra and special instructions included.",
  });
};

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleClearFilters = () => {
    setStatusFilter("all");
    setSelectedDate("");
    setCurrentPage(1); // Always reset to page 1 when clearing
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage bookings and view daily reports
            </p>
          </div>
          <Button variant="sacred" className="gap-2" onClick={handleDownloadReport}>
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">{stats.confirmed}</div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="col-span-2 md:col-span-1">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary flex items-center">
                <IndianRupee className="h-5 w-5" />
                {monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">This Month's Revenue</p>
            </CardContent>
          </Card>
          <Link to="/admin/pujas" className="col-span-2 md:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary flex items-center">
                  Manage Pujas
                </div>
                <p className="text-sm text-muted-foreground">
                  Add, edit, or delete poojas
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, or pooja..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setCurrentPage(1); // Reset to first page on date change
                    }}
                    className="w-40"
                  />
                </div>
                {/* Clear Filter Button */}
                {(statusFilter !== "all" || selectedDate !== "") && (
                  <button
                    onClick={handleClearFilters}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    <FilterX className="h-4 w-4 mr-2" />
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              Daily Booking List
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Loading bookings...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Devotee</TableHead>
                      <TableHead>Pooja</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedBookings.map((booking) => (
                      <TableRow key={booking.bookingId}>
                        <TableCell className="font-medium">{booking.bookingId}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.devoteeName}</p>
                            <p className="text-xs text-muted-foreground">{booking.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.poojaType}</TableCell>
                        <TableCell>
                          {new Date(booking.poojaDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{booking.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.paymentStatus)}</TableCell>
                        <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {!loading && displayedBookings.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>No bookings found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
