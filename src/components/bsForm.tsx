import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BsForm({ submit }: { submit: Function }) {
    const router = useRouter();
    const [formData, setFormData] = useState({ number: 0 });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [error, setError] = useState<{ status: string, message: string } | null>(null);

    const inputTextHanlder = (inputField: any) => {
        setFormData({ number: parseInt(inputField.target.value) });
        console.log(inputField.target.value);
    }

    const submitForm: React.FormEventHandler<HTMLFormElement> = async (event?: React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        await submit(formData);
        setIsLoading(false);
        setFormData({ number: 0 });
        router.push(`/dashboard`);
    }

    return (
        <>
            <div className="flex items-center w-full py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center w-3/5">
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={submitForm}>
                        <div className="mb-6">
                            <label htmlFor="success" className="flex justify-start mb-1 text-sm font-medium text-green-700 dark:text-green-500">Today's Number</label>
                            <input type="text" id="success" className="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-100" onChange={inputTextHanlder} />
                            {/* <p className="mt-2 text-sm text-green-600 dark:text-green-500"><span className="font-medium">Well done!</span> Some success message.</p> */}
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save</button>
                    </form>
                </div>
            </div>
        </>
    )
}