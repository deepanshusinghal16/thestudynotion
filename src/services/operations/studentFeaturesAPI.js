import { toast } from "react-hot-toast";
import { studentEndpoints } from "../api";
import { apiConnector } from "../apiConnector";
import logo from "../../assets/Logo/Logo-Small-Dark.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Razor Pay SDK failed to load");
            return;
        }

        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, { Authorization: `Bearer ${token}` });

        console.log(orderResponse)
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "StudyNotion",
            description: "Thanks for trusting on us for your future..!",
            image: logo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops..! Something went wrong")
            console.log(response.error)
        })
    }
    catch (error) {
        console.log("Error in payment processing", error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
};

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        console.log("inside the send Payment Succes Emial Frontend", response)
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        },
            {
                Authorization: `Bearer ${token}`
            })
    }
    catch (error) {
        console.log("payment success email error: " + error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifing  payment");
    dispatch(setPaymentLoading(true));
    console.log("Inside the verifyPayment Function", bodyData)
    try {
        const res = await apiConnector("POST", COURSE_VERIFY_API, bodyData,
            { Authorization: `Bearer ${token}` });

        if (!res.data.success) {
            throw new Error(res.data.message);
        }
        toast.success("Payment Successful");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart())
    }
    catch (error) {
        console.log("Payment Verification Error: " + error);
        toast.error("Payment Verification Error");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}



