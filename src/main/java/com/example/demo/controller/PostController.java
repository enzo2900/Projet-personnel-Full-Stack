package com.example.demo.controller;

import com.example.demo.map.project.Post;
import com.example.demo.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class PostController {

    @Autowired
    private  PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping(path="/post/get")
    public List<Post> getPost() {
        return postService.getAllPosts();

    }

    @PutMapping(path="/post/add")
    public void addPost(@RequestBody Post post) {
        postService.addPost(post);

    }
}
