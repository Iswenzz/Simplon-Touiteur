/**
 * Get the authorization header from a token saved in the localstorage.
 */
export const getAuthHeader = () =>
{
	return 	{
		Authorization: `Bearer ${localStorage.getItem("auth") ?? "fail"}`
	};
};
