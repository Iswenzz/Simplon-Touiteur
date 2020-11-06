import React, {useEffect, useState} from "react";
import Main from "../Main/Main";
import Post from "../Home/Post/Post";
import "./PostPage.scss";
import axios from "axios";
import {withRouter} from "react-router";

/**
 * Post a tweet page.
 * @returns {JSX.Element}
 * @constructor
 */
export const PostPage = (props) =>
{
	const [state,setState] = useState({});

	useEffect(() =>
	{
		try
		{
			const fetchData = async () =>
			{
				const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/user/${localStorage.getItem("userid")}`);
				console.log(response);
				setState({
					...response.data.user
				});
			};
			fetchData();
		}
		catch (e)
		{
			console.log(e);
		}
	}, []);


	return (
		<Main {...props}>
			<section className={"postpage"}>
				<Post rows={20} user={state} />
			</section>
		</Main>
	);
};

export default withRouter(PostPage);