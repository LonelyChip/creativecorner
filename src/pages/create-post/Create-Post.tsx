import "./Create-Post.css";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

interface Post{
	title: string,
	description: string,
	tag: string,
}
export const CreatePost = () =>{
	const navigate = useNavigate();
	const schema = yup.object().shape({
		title:yup.string().required("Please enter the title..."),
		description:yup.string().required("Please enter the description..."),
		tag:yup.string().required("Please enter the tag..."),
	});
	const {register, handleSubmit, formState:{errors}} = useForm<Post>({
		resolver:yupResolver(schema),
	});
	const [user] = useAuthState(auth);
	const postRef = collection(db,"posts");
	const onCreatePost= async (data: Post) =>{
		await addDoc(postRef,{
			...data,
			userId:user?.uid,
			userName:user?.displayName
		})
		navigate("/");
	}
	return(
		<div className="create-post">
			<form className="create-form">
			<input type="text" placeholder="Title" {...register("title")}/>
			{errors.title?.message && <p style={{ color:"red" }}>{errors.title?.message}</p>}
			<textarea placeholder="Description" {...register("description")}/>
			{errors.description?.message && <p style={{ color:"red" }}>{errors.description?.message}</p>}
			<input type="text" placeholder="#Tag" {...register("tag")}/>
			{errors.tag?.message && <p style={{ color:"red" }}>{errors.tag?.message}</p>}
			<button onClick={handleSubmit(onCreatePost)}>Post</button>
			</form>
		</div>
	)
};