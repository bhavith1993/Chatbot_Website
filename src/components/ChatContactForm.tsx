import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Building2, User, CheckCircle } from "lucide-react";

const chatContactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  companyName: z.string().trim().min(1, { message: "Company is required" }).max(100),
  email: z.string().trim().email({ message: "Invalid email" }).max(255),
  phone: z.string().trim().min(1, { message: "Phone is required" }).max(20),
});

type ChatContactValues = z.infer<typeof chatContactSchema>;

interface ChatContactFormProps {
  onSubmitSuccess?: () => void;
}

const ChatContactForm = ({ onSubmitSuccess }: ChatContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ChatContactValues>({
    resolver: zodResolver(chatContactSchema),
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ChatContactValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Chat contact form submitted:", data);
      
      toast({
        title: "Request sent!",
        description: "We'll contact you with pricing details soon.",
      });
      
      setIsSubmitted(true);
      onSubmitSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-primary/10 rounded-lg p-4 text-center">
        <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
        <p className="text-sm font-medium text-foreground">Thank you!</p>
        <p className="text-xs text-muted-foreground">We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-muted rounded-lg p-3">
      <p className="text-xs text-muted-foreground mb-3">
        Please share your details and we'll send you pricing information:
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input
                      placeholder="Your name"
                      className="h-8 text-xs pl-7"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Building2 className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input
                      placeholder="Company name"
                      className="h-8 text-xs pl-7"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email address"
                      className="h-8 text-xs pl-7"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      className="h-8 text-xs pl-7"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="sm"
            className="w-full h-8 text-xs"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Get Pricing Info"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatContactForm;
