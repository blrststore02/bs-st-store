import { RestEndPService } from "@/api/restClient.service";
import { AxiosError } from "axios";
import { toast } from "@/components/bsToast";
import { BsNumber, BsNumbers } from "@/models/BsNumber";

export const DashboardService = () => {
    const restEndPService = RestEndPService();
    const getNumberList = async (pageNum: Number = 0, pageSize: Number = 10 ): Promise<[BsNumbers, boolean]> => {
        let response: BsNumbers = { results: [], totalcount: 0 };
        let isLoading: boolean = true;
        let error: any = {
            message: ""
        };
        try {
            const data: any = await restEndPService.get("allNumbers", {pageNum, pageSize}).then((response: { data: any; }) => response.data);
            response = data;
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                error = { message: err.message };
            } else {
                error = { message: error || "Please wait a few minutes before you try again!!!" };
            }
            toast.notify(`Error: ${error.message}`);
        } finally {
            isLoading = false;
        }
        return [response, isLoading];
    }

    const getNumberByDate = async (date: any) => {
        let response: BsNumber = {
            id: 0,
            randomNumber: 0,
            numberInsertionDate: ""
        };
        let isLoading: boolean = true;
        let error: any = {
            message: ""
        };
        try {
            response = await restEndPService.get(`number/${date}`).then((response: { data: any; }) => response.data);
        } catch (err: AxiosError | unknown) {
            if (err instanceof AxiosError) {
                error = { message: err.message };
            } else {
                error = { message: error || "Please wait a few minutes before you try again!!!" };
            }
            toast.notify(`Error: ${error.message}`, { type: 'error', duration: 50 });
        } finally {
            isLoading = false;
        }
        return [response, isLoading];
    }

    return {
        getNumberList,
        getNumberByDate
    };
}
