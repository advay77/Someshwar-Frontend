import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
}

function generateCaptcha(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function Captcha({ onVerify }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    regenerateCaptcha();
  }, []);

  const regenerateCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setUserInput("");
    setIsVerified(false);
    setError("");
    onVerify(false);
  };

  const verifyCaptcha = () => {
    if (userInput.toLowerCase() === captchaText.toLowerCase()) {
      setIsVerified(true);
      setError("");
      onVerify(true);
    } else {
      setError("CAPTCHA doesn't match. Please try again.");
      regenerateCaptcha();
    }
  };

  return (
    <div className="space-y-3 p-4 rounded-lg bg-secondary/50 border">
      <label className="text-sm font-medium text-foreground">
        Security Verification
      </label>
      
      <div className="flex items-center gap-3">
        {/* Captcha Display */}
        <div className="flex-1 h-12 bg-gradient-to-r from-muted to-secondary rounded-lg flex items-center justify-center select-none relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-foreground/30"
                style={{
                  top: `${20 + i * 15}%`,
                  left: 0,
                  right: 0,
                  transform: `rotate(${-5 + i * 2}deg)`,
                }}
              />
            ))}
          </div>
          <span
            className="text-xl font-mono font-bold tracking-widest text-foreground"
            style={{
              textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              letterSpacing: "0.3em",
            }}
          >
            {captchaText}
          </span>
        </div>

        {/* Refresh Button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={regenerateCaptcha}
          className="flex-shrink-0"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Input Field */}
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter CAPTCHA"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={isVerified}
          className={isVerified ? "bg-green-50 border-green-500" : ""}
        />
        <Button
          type="button"
          onClick={verifyCaptcha}
          disabled={isVerified || !userInput}
          variant={isVerified ? "default" : "outline"}
          className={isVerified ? "bg-green-600 hover:bg-green-600" : ""}
        >
          {isVerified ? "✓ Verified" : "Verify"}
        </Button>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {isVerified && (
        <p className="text-sm text-green-600 font-medium">
          ✓ CAPTCHA verified successfully
        </p>
      )}
    </div>
  );
}
