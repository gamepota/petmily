import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function SignupStepA(props) {
  /* 회원 폼 상태 */
  const [email, setEmail] = useState("");
  const [isEmailValidated, setEmailValidated] = useState(false);
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  function validateEmail(email) {
    const hasAvailableRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(
      email,
    );
    if (hasAvailableRegex) {
      setEmailValidated(true);
    }
    console.log(hasAvailableRegex);
  }

  const handleClick = () => setShow(!show);

  const handleSubmit = () => {
    // 폼 검증 로직 등을 추가하고 유효성 검사 후 경로 이동
    if (isEmailValidated && password === password_confirm) {
      navigate("/signup/stepb");
    } else {
      // 오류 처리
      alert("입력정보를 확인해주세요.");
    }
  };

  return (
    <>
      <Center>
        <Box w={500}>
          <FormControl isRequired>
            <FormLabel>이메일</FormLabel>
            <Input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>닉네임</FormLabel>
            <Input
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>패스워드</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>패스워드 확인</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                onChange={(e) => {
                  setPassword_confirm(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button onClick={handleSubmit}>다음</Button>
        </Box>
      </Center>
    </>
  );
}
