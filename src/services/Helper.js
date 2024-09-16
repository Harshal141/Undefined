const configCreater = (url,key) =>{
    return {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://test.api.amadeus.com/${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    };
}

export default configCreater;