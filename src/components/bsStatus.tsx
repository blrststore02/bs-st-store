export default function BsStatus(props: { date: any }) {
    const result = 23;
    return (
        <>
            <div className="flex items-center w-full py-8 px-4 mx-auto max-w-screen-xl sm:pb-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">Stay connected & Track Results on Date Selected</h2>
                    {
                        props.date &&
                        <section>
                            <p className="mb-6 font-sm text-gray-500 dark:text-gray-400 md:text-2xl">{props.date && `${props.date}` || 'No Date Selected'}</p>
                            <a href="#" className="text-white text-2xl bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">{result}</a>
                        </section>
                        ||
                        <p className="mb-6 font-sm text-gray-500 dark:text-gray-400 md:text-2xl">{props.date && `${props.date}` || 'No Date Selected'}</p>
                    }
                </div>
            </div >
        </>
    )
}