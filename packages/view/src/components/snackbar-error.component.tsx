import * as React from "react";
import { Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export class SnackbarErrorComponent extends React.Component<{} , {}> {

    constructor(props: any) {
        super(props);
        this.state = {
            open: false,
            vertical: 'top',
            horizontal: 'center'
        }
    }


    handleClose(event: any, reason: string) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState( {
            open: false
        })
    }

    render () {
        return (
            <Snackbar
                open={true}
                autoHideDuration={6000} onClose={this.handleClose}>
                <Alert severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
        )
    }

}
