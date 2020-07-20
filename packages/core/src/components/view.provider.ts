export class ViewProvider {

    public static provider(introspectionQuery: any) {
        return fetch('http://localhost:3001/graphql', {
            method: 'post',
            credentials: 'include',
        }).then( (response: any) => {
            return response.text();
        }).then( (responseBody: string) => {
            try {
                return JSON.parse(responseBody);
            } catch (error) {
                return responseBody;
            }
        });
    }

    public static clickListener(document: any) {
        const items = document.querySelectorAll(".field.edge-source,.field");

        for(const item of items) {
            item.addEventListener('click', (event: any) => {

                let client = document.querySelector('.select-shield').querySelector('input[name="clients"]').value;

                if (event.target.classList.contains('type-link')) {
                    return;
                }

                if (item.classList.contains('field-selected')) {
                    item.classList.remove('field-selected');
                    let idField = item["id"];
                    let url = "/voyager-shield-api?id=" + idField + "&client=" + client + "&method=DELETE";
                    fetch(url).then((result:any) =>  console.log(result));
                } else {
                    let idField = item["id"];
                    item.classList.add('field-selected');
                    let url = "/voyager-shield-api?id=" + idField + "&client=" + client + "&method=POST";
                    console.log(url);
                    fetch(url).then((result: any) => {
                        console.log("show a error")
                    });
                }
            });
        }
    }
}
