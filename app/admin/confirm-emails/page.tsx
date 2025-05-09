'use client'
import MainContainer from "@/components/ui/containers/main-container";
import PageContainer from "@/components/ui/containers/page-container";
import { useGetUser } from "@/hooks/hooks";
import { useToggleAdmin, useToggleEmployee } from "@/mutations/mutations";
// import { User } from "@auth/core/types";

export default function Page() {


    return (
        <PageContainer>
            <EmployeeList />
        </PageContainer>
    );
}

function EmployeeList() {
    const { data } = useGetUser();
    const { mutate: mutateAdmin } = useToggleAdmin();
    const { mutate: mutateEmployee } = useToggleEmployee();

    console.log(data)
    return (
        <MainContainer>
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">User Permissions</h2>
                {data?.map((user) => (
                    <div key={user.id} className="flex flex-col md:flex-row items-center space-x-4 p-4 border rounded">
                        <div className="flex-grow">
                            <p className="font-medium">{user.name}</p>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <div className="space-x-4 flex items-center">
                            <label className="flex items-center space-x-2">
                                <input
                                    onClick={() => user.email && mutateAdmin(user.email)}
                                    type="checkbox"
                                    defaultChecked={user.admin}
                                    className="form-checkbox"
                                />
                                <span>Admin</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    onClick={() => user.email && mutateEmployee(user.email)}
                                    type="checkbox"
                                    defaultChecked={user.employee}
                                    className="form-checkbox"
                                />
                                <span>Employee</span>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </MainContainer>
    )
}

