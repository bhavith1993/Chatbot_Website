import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, CheckCircle } from "lucide-react";

const companySizeOptions = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "50+", label: "50+" },
  { value: "200+", label: "200+" },
];

const chatContactSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  email: z.string().trim().email({ message: "Invalid email" }).max(255),
  phone: z.string().trim().min(1, { message: "Phone is required" }).max(20),
});

type ChatContactValues = z.infer<typeof chatContactSchema>;

interface ChatContactFormProps {
  onSubmitSuccess?: () => void;
}

const ChatContactForm = ({ onSubmitSuccess }: ChatContactFormProps) => {
  const { toast } = useToast();
  const [companySize, setCompanySize] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ChatContactValues>({
    resolver: zodResolver(chatContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: ChatContactValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Chat contact form submitted:", { ...data, companySize });
      
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

  // Step 1: Show company size selection
  if (!companySize) {
    return (
      <div className="bg-muted rounded-lg p-3">
        <p className="text-xs text-muted-foreground mb-3">
          How many employees does your company have?
        </p>
        <RadioGroup
          onValueChange={(value) => setCompanySize(value)}
          className="grid grid-cols-2 gap-2"
        >
          {companySizeOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={`size-${option.value}`}
                className="h-4 w-4"
              />
              <FormLabel
                htmlFor={`size-${option.value}`}
                className="text-xs font-normal cursor-pointer"
              >
                {option.label}
              </FormLabel>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  // Step 2: Show contact form after company size is selected
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
