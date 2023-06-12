import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { TextField, IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

const AddComment = ({ err, setErr, setComments }) => {
  const { article_id } = useParams();
  const { user, isLoggedIn } = useContext(UserContext);
  const [body, setBody] = useState("");
  const [username, setUsername] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const handlePlaceholder = () => {
    if (isLoggedIn) {
      return "Please log in to add a comment...";
    } else {
      return "Add a comment...";
    }
  };

  const handlePostComment = (event) => {
    event.preventDefault();
    setButtonDisable(true);
    const newComment = {
      username: username,
      body: body,
      votes: 0,
    };

    setBody([]);
    setUsername("");

    if (body.length === 0) {
      setErr("No Information! Please try again!");
      setButtonDisable(false);
    } else {
      postComment(article_id, newComment)
        .then((addedComment) => {
          console.log("here here");
          setComments((currentComments) => {
            setButtonDisable(false);
            setErr(null);
            return [addedComment, ...currentComments];
          });
        })
        .catch((err) => {
          setErr("No Information! Please try again!");
        });
    }
  };

  return (
    <main>
      <form className="comments-form" onSubmit={handlePostComment}>
        {/* <TextField
          id="outlined-text"
          multiline
          rows={3}
          sx={{
            width: "80%",
            paddingBottom: "4.8%",
          }}
          color="secondary"
          placeholder="Add a comment..."
          // margin="normal"
        /> */}
        <textarea
          className="text-area"
          rows="5"
          cols="50"
          placeholder={handlePlaceholder()}
          name="search"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </form>
      <IconButton type="submit">
        <AddBoxIcon sx={{ color: "secondary" }} />
      </IconButton>
    </main>
    // <form onSubmit={handlePostComment}>
    //   <select
    //     id="username"
    //     placeholder="username..."
    //     value={username}
    //     onChange={(event) => setUsername(event.target.value)}
    //   >

    //   <label>
    //     <textarea
    //       className="text-area"
    //       rows="5"
    //       cols="50"
    //       placeholder="Add a comment..."
    //       name="search"
    //       value={body}
    //       onChange={(event) => setBody(event.target.value)}
    //     />
    //   </label>
    //   <button className="button" type="submit" disabled={buttonDisable}>
    //     POST
    //   </button>
    // </form>
  );
};

export default AddComment;
