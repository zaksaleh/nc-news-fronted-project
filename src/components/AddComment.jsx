import { useState } from "react";
import { useParams } from "react-router-dom";
import { postComment } from "../api";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

const AddComment = ({ err, setErr, setComments }) => {
  const { article_id } = useParams();
  const { user, isLoggedIn } = useContext(UserContext);
  const [body, setBody] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);

  const handlePlaceholder = () => {
    if (isLoggedIn) {
      return "Please sign in to add a comment...";
    } else {
      return "Add a comment...";
    }
  };

  const handlePostComment = (event) => {
    event.preventDefault();
    console.log(user);
    setButtonDisable(true);
    const newComment = {
      username: user.username,
      body: body,
      votes: 0,
    };

    setBody([]);

    if (body.length === 0) {
      setErr("No Information! Please try again!");
      setButtonDisable(false);
    } else {
      postComment(article_id, newComment)
        .then((addedComment) => {
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
        <textarea
          className="text-area"
          rows="5"
          cols="50"
          placeholder={handlePlaceholder()}
          name="search"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <section className="plus-comment">
          <IconButton
            type="submit"
            sx={{
              color: "#35344c",
            }}
          >
            <AddBoxIcon />
          </IconButton>
        </section>
      </form>
    </main>
  );
};

export default AddComment;
