package com.cinema.app.model;
import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Data
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "theaters")
public class Theater {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private Integer totalSeats;

    @OneToMany(mappedBy = "theater", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Screen> screens;
}
