import { Box, Button, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { StarRating } from "./StarRating.jsx";

export function CommentWrite({ hospitalId, isProcessing, setIsProcessing }) {
  const [comment, setComment] = useState("");
  const toast = useToast();

  function handleCommentSubmitClick() {
    setIsProcessing(true);

    axios
      .post("/api/hospitalComment/add", {
        hospitalId,
        comment,
      })
      .then((res) => {
        setComment("");
        toast({
          description: "댓글이 등록되었습니다.",
          position: "top",
          status: "success",
        });
      })
      .catch()
      .finally(() => {
        setIsProcessing(false);
      });
  }

  return (
    <Box>
      <StarRating />
      <Textarea
        placeholder="리뷰를 남겨주세요."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        isDisabled={comment.trim().length === 0}
        isLoading={isProcessing}
        onClick={handleCommentSubmitClick}
        colorScheme="blue"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </Button>
    </Box>
  );
}
