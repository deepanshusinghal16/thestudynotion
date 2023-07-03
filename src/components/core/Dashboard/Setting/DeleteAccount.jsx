import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    async function handleDeleteAccount() {
        try {
            dispatch(deleteProfile(token, navigate))
        } catch (error) {
           //console.log("ERROR MESSAGE - ", error.message)
        }
    }

    return (
        <>
            <div className=" my-2  flex flex-row   gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-4 md:px-10 items-center">
                <div className="flex aspect-square w-10 h-10 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-pink-700">
                    <FiTrash2 className="text-2xl text-pink-200" />
                </div>
                <div className="flex flex-col space-y-2  py-3">
                    <h2 className="text-md font-semibold text-richblack-5">
                        Delete Account
                    </h2>
                    <div className=" md:w-10/12 text-pink-25 text-xs">
                        <p>Would you like to delete account?</p>
                        <p>
                            This account may contain Paid Courses. Deleting your account is
                            permanent and will remove all the contain associated with it.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="w-fit cursor-pointer italic text-pink-300"
                        onClick={handleDeleteAccount}
                    >
                        I want to delete my account.
                    </button>
                </div>
            </div>
        </>
    )
}
