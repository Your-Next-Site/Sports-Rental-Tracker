import PageContainer from "@/components/ui/containers/page-container";
import Policy from "@/components/ui/policy/policy";

export default function Page() {
    return (
        <PageContainer>
            <Policy name="Privacy Policy" text="
            At Raft Tracker 5000, we are committed to protecting your privacy. This Privacy Policy outlines how we 
            collect, use, and safeguard your personal information. We collect and store only essential information 
            including customer names, user names, and email addresses. This information is used exclusively for account 
            management, service-related communications, and essential system notifications. We implement appropriate 
            security measures to protect your personal information from unauthorized access, alteration, or disclosure. 
            We retain your data only for as long as necessary to provide our services and comply with legal obligations. 
            If you have questions about our privacy practices, please contact us.
        " />
        </PageContainer>
    );
}