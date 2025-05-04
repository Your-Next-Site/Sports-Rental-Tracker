import Policy from "@/components/ui/policy/policy";

export default function Page() {
  return (
    <Policy
      name="Terms of Service"
      text="Only authorized employees are allowed access to the Raft Tracker 5000 system. By using this system, you agree to:
        Maintain strict confidentiality of all data and information accessed through this system.
        Use the system only for official business purposes related to raft and paddle station operations.
        Not share your login credentials with any other person.
        Report any security concerns or unauthorized access immediately.
        Ensure all submitted data is accurate and truthful.
        Comply with all applicable laws and regulations regarding water safety and business operations.
        All data submitted is conditional and should not be shared with individuals outside of the paddle station. 
        The system and its contents are proprietary and intended solely for authorized business purposes."
    />
  );
}