import * as React from "react";
import {MenuItem, Select} from '@material-ui/core'
//const fetch = require('node-fetch');

interface Item { value: string }
interface StateType { items: Item[] }
interface Params {
    shieldEndpointUrl: string
}

export class SelectComponent extends React.Component<Params, StateType> {

    constructor(props: any) {
        super(props)
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        this.setState( {
            items: [{value: "ClientX"}, {value: "ClientY"}, {value: "ClientW"}]
        })
    }

    handleChange(event: any) {
        let selectedClient = event.target.value
        let greenElements = document.getElementsByClassName('field-selected');
        while (greenElements.length) greenElements[0].classList.remove('field-selected');

        fetch(`http://localhost:3001/voyager-shield-api?method=GET&client=${selectedClient}`).then((res: any) => res.json()).then((result: any) => {

            function markField(selector: string) {
                let el = document.querySelector(selector); el && el.classList.add('field-selected');
            }

            for(let idx = 1; idx <= result.length; idx++) {
                let client = result[idx - 1].client;
                let constraints = result[idx - 1].constraints;

                if (selectedClient.toLowerCase() === client) {
                    for(let index = 0; index < constraints.length; index++) {
                        markField('[id="' + constraints[index].id + '"]');
                        markField('[data-from="' + constraints[index].id + '"]');
                    }
                }
            }
        })

    }

    render () {
        let items = this.state.items
        let options = items.map((item: Item) => <MenuItem value={item.value}> { item.value } </MenuItem>)
        return (
            <Select name={"clients"} onChange={ this.handleChange } >
                {options}
            </Select>
        )
    }

}
