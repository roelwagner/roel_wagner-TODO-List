const baseURL = "https://jsonbox.io/box_ea9b687e0b72688bbfd1/";

const getData = async () => {
    try {
        const result = await fetch(baseURL);
        const json = await result.json();
        return json;
    } catch (error) {
        console.log(error)
    }
}

const postData = async data => {
    try{
        const result = await fetch(baseURL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await result.json();
    }catch(error){
    console.log(error);
}
};

const deleteData = async id => {
    try{
        const result = await fetch(
            baseURL + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const json = await result.json();
    }catch(error){
    console.log(error);
}
};

const changeData = async (id, taskData, statusData) => {
    try{
        const result = await fetch(
            baseURL + id, {
                method: "PUT",
                body: JSON.stringify({
                    description: taskData,
                    done: statusData
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    }catch(error){
        console.log(error)
    }
}