import { RestEndPService } from "@/api/restClient.service";
import { AxiosError } from "axios";

export const DashboardService = () => {
    const restEndPService = RestEndPService();
    
    const getNumberList = async (date: string | null) => {
        let response: string = "";
        let isLoading: boolean = true;
        let error: any = {
            status: "",
            message: ""
        };
        try {
            const data: any = await restEndPService.get("/allNumbers", date).then((response: { data: any; }) => response.data);
            response = data;
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.log(`Error: ${err}`);
                error = { status: err.message || "Invalid user name or password" };
            } else {
                error = { status: "failure", message: error || "Server Error!!!" };
            }
        } finally {
            isLoading = false;
        }
        return [response, isLoading, error];
    }

    const getNumberByDate = async (date: any) => {
        let response: string = "";
        let isLoading: boolean = true;
        let error: any = {
            status: "",
            message: ""
        };
        try {
            const data: any = await restEndPService.get(`/number/${date}`).then((response: { data: any; }) => response.data);
            response = data;
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.log(`Error: ${err}`);
                error = { status: err.message || "Invalid user name or password" };
            } else {
                error = { status: "failure", message: error || "Server Error!!!" };
            }
        } finally {
            isLoading = false;
        }
        return [response, isLoading, error];
    }

    return {
        getNumberList,
        getNumberByDate
    };
}
