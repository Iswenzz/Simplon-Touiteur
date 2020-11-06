import axios from "axios";

/**
 * Check if the user is authenticated.
 */
export const checkAuth = async () =>
{
	try
	{
		const response = await axios.get(`${process.env.REACT_APP_BACKEND}/api/check`);
		return response.status === 200;
	}
	catch (err)
	{
		console.log(err);
	}
	return false;
};

/**
 * Redirect authenticated user to the home page.
 * @param history - React router history object.
 * @returns {Promise<void>}
 */
export const redirectLoggedUser = async (history) =>
{
	if (await checkAuth())
		history.push("/home");
};
