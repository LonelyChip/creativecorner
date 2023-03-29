import PostCard from "../components/PostCard";
import {getDocs, collection} from "firebase/firestore";
import { db } from "../config/firebase";
import {useState, useEffect}  from "react";

export interface Post{
	postId: string,
	title: string,
	description: string,
	tag: string,
	userId:string,
	userName: string,

}
export const Home = () =>{
	const postRef = collection(db,"posts");
	const [postList, setPostList] = useState<Post [] | null >(null);
	const getPosts = async () =>{
		const data = await getDocs(postRef);
		setPostList(data.docs.map((doc)=>({...doc.data(),postId:doc.id})) as Post[]);
	}
	useEffect(()=>{
		getPosts();
	},[]);
	return (
		<div>
			{postList?.map((post)=>(<PostCard post={post}/>))}

		</div>
	)
}