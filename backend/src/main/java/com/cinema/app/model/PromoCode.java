package com.cinema.app.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Table(name = "promo_codes")
public class PromoCode {

    @Id
    private String code;

    private Double discountPercent;
    private LocalDate expiryDate;
}
