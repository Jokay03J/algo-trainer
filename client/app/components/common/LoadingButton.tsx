import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";

export interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

const LoadingButton = ({ loading, children, ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <Loader2 className="animate-spin" /> : null} {children}
    </Button>
  );
};

export default LoadingButton;
