import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { BoardCommentWrite } from "./BoardCommentWrite.jsx";
import { BoardCommentList } from "./BoardCommentList.jsx";

export function BoardCommentComponent({ boardId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <Box>
      <BoardCommentWrite
        boardId={boardId}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
      <BoardCommentList
        boardId={boardId}
        setIsProcessing={setIsProcessing}
        isProcessing={isProcessing}
      />
    </Box>
  );
}