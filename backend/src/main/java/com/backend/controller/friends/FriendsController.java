package com.backend.controller.friends;

import com.backend.domain.friends.FriendRequest;
import com.backend.domain.member.Member;
import com.backend.service.friends.FriendsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FriendsController {

	private final FriendsService friendsService;
	private static final Logger logger = LoggerFactory.getLogger(FriendsController.class);

	public FriendsController(FriendsService friendsService) {
		this.friendsService = friendsService;
	}

	@GetMapping("/api/friends/{nickname}")
	public List<Member> getFriends(@PathVariable String nickname) {
		logger.info("Received request to fetch friends for nickname: {}", nickname);
		List<Member> friends = friendsService.getFriendsWithNicknames(nickname);
		logger.info("Returning friends for nickname {}: {}", nickname, friends);
		return friends;
	}

	@PostMapping("/api/friends/add")
	public void addFriend(@RequestBody FriendRequest friendRequest) {
		logger.info("Received request to add friend: {}", friendRequest);
		friendsService.addFriend(friendRequest);
	}
}
