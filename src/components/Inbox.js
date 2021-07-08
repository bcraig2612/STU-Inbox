import React, {useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import {
  Link,
} from "react-router-dom";

function Inbox(props) {
  const [conversations, setConversations] = useState([
    {id: 1, text: "Hello", name: "Billy"},
    {id: 2, text: "Hi", name: "Sam"},
  ]);
  const [selectedConversation, setSelectedConversation] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedConversation(index);
  };

  const inboxListItems = conversations.map((conversation) => {
    return (
      <Link to={"/conversation/" + conversation.id}>
        <ListItem button selected={selectedConversation === conversation.id} alignItems="flex-start">
          <ListItemText
            primary={conversation.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {conversation.name}
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </Link>
    );
  });

  return (
    <List>
      {inboxListItems}
    </List>
  );
}

export default Inbox;