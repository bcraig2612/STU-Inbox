import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ConversationItem from "./ConversationItem";

const useStyles = makeStyles((theme) => ({
    conversationContainer: {
        backgroundColor: "#fff",
        flex: "1",
        overflowY: "scroll",
        padding: theme.spacing(2),
    }
}));

function Conversation(props) {
    const classes = useStyles();

    const conversationItems = props.messages.map(message => {
        return <ConversationItem message={message} />;
    });

    return (
        <div className={classes.conversationContainer}>
            {conversationItems}
        </div>
    );
}

export default Conversation;