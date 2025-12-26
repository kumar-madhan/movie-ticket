package com.cinema.app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String message;
    private Boolean readStatus = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
