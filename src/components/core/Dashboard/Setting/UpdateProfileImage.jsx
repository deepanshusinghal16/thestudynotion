import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn";


export default function ChangeProfilePicture() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture", imageFile)
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false)
            })
        } catch (error) {
            console.log("Error occured ", error)
        }
    }

    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])
    return (
        <>
            <div className="flex items-center justify-between rounded-md border-[1px]  border-richblack-700 bg-richblack-800 py-6 px-4   md:px-12 text-richblack-5">
                <div className="flex  items-center gap-4">
                    <img
                        src={previewSource || user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-12 sm:w-16 rounded-full object-cover"
                    />
                    <div className="space-y-2 space-x-2 flex flex-col justify-center items-center">
                        <p>Change Profile Picture</p>
                        <div className="flex flex-row gap-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/gif, image/jpeg"
                            />
                            <button
                                onClick={handleClick}
                                disabled={loading}
                                className="cursor-pointer rounded-lg bg-richblack-700 py-1 px-4 text-sm text-richblack-50"
                            >
                                Select
                            </button>
                            <IconBtn
                                text={loading ? "Uploading..." : "Upload"}
                                onClickFxn={handleFileUpload}
                                customClasses={"flex gap-2 items-center bg-yellow-25  text-sm rounded-lg py-1 px-2 text-richblack-700"}

                            >
                                {!loading && (
                                    <FiUpload className="text-md text-richblack-900" />
                                )}
                            </IconBtn>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}