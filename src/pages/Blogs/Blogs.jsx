import { useState } from "react";

const Blogs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    const items = [
        {
            title: "What is an access token and refresh token? How do they work and where should we store them on the client-side?",
            content: (
                <div>
                    An access token is a credential used to access protected resources on behalf of a user.<br />
                    It is typically issued by an authorization server after the user successfully logs in and grants permissions to a client application.<br />
                    The access token is then sent along with each request to the server to access protected resources.<br /><br />

                    On the other hand,<br /><br />

                    A refresh token is a credential used to obtain a new access token once the current access token expires.<br />
                    It is typically issued along with the access token and is used to request a new access token without requiring the user to log in again.<br /><br />

                    The browser's localStorage in HTTP-only cookie is more secure than tokens from unauthorized access to prevent unauthorized access to the user's data.
                </div>
            )
        },
        {
            title: "Compare SQL and NoSQL databases?",
            content: "SQL databases use structured query language for complex queries and transactions, suitable for applications like financial systems. NoSQL databases are non-relational, offering scalability and flexibility for applications like social media platforms. SQL emphasizes consistency and ACID properties, while NoSQL focuses on horizontal scalability and handling unstructured data. The choice depends on the application's requirements for data structure, scalability, and complexity of queries."
        },
        {
            title: "What is express js? What is Nest JS (google it)?",
            content: (
                <div>
                    Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It is designed for building web applications and APIs. <br></br> <br />

                    NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript and is built with the principles of Angular. It is designed to make building enterprise-grade applications easier and more efficient.
                </div>
            )
        },
        {
            title: "What is MongoDB aggregate and how does it work (google it)?",
            content: (
                <div>
                    MongoDB's aggregate function is used for processing data records and returns computed results. It allows for data transformation, filtering, grouping, sorting, and more in a MongoDB collection. <br /><br />
                    The aggregate function in MongoDB works by taking an array of aggregation pipeline stages as input. Each stage performs a specific operation on the data, such as filtering documents, grouping data, projecting fields, or sorting results.
                </div>
            )
        }
    ]


    return (
        <div className="mt-5 md:mt-16 p-2 max-w-6xl mx-auto">
            <h1 className="my-10 text-center text-4xl font-semibold">Welcome To My Blogs</h1>
            {items.map((item, index) => (
                <div key={index} className="border rounded-lg overflow-hidden mb-2">
                    {/* Accordion header */}
                    <div
                        className="bg-gray-200 px-4 py-2 cursor-pointer flex justify-between items-center transition-colors duration-300"
                        onClick={() => toggleAccordion(index)}
                    >
                        <h2 className="font-semibold">{item.title}</h2>
                        {/* Plus or minus icon based on accordion state */}
                        <svg
                            className={`w-6 h-6 text-gray-600 transform transition-transform ${openIndex === index ? 'rotate-180' : ''
                                }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 9L12 15L18 9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    {/* Accordion content (conditionally rendered based on isOpen state) */}
                    <div
                        className={`overflow-hidden transition-max-height duration-300 ${openIndex === index ? 'max-h-screen' : 'max-h-0'
                            }`}
                    >
                        <div className="px-4 py-2 bg-gray-200">
                            <p className="text-gray-700">{item.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default Blogs;