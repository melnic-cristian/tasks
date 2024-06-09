package com.randomword.backend.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.Random;
import java.util.concurrent.atomic.AtomicBoolean;

@Controller
public class WebSocketController {

    private static final String[] WORDS = {"cat", "dog", "mouse", "horse", "fox"};
    private final Random random = new Random();
    private final SimpMessagingTemplate messagingTemplate;
    private final AtomicBoolean isActive = new AtomicBoolean(false);

    public WebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/start")
    public void start() {
        isActive.set(true);
    }

    @MessageMapping("/stop")
    public void stop() {
        isActive.set(false);
    }

    @Scheduled(fixedRate = 5000)
    public void sendRandomWord() {
        if (isActive.get()) {
            messagingTemplate.convertAndSend("/topic/words", getRandomWord());
        }
    }

    private String getRandomWord() {
        int index = random.nextInt(WORDS.length);
        return WORDS[index];
    }
}
