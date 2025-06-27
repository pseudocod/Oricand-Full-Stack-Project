package dd.projects.demo.user;

import dd.projects.demo.address.Address;
import dd.projects.demo.cart.Cart;
import dd.projects.demo.loyalty.LoyaltyCard;
import dd.projects.demo.order.Order;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String firstName;

    @Column(length = 50, nullable = false)
    private String lastName;

    @Column(length = 100, nullable = false)
    private String email;

    @Column(length = 20)
    private String phoneNumber;

    @Column(length = 255, nullable = false)
    private String password;

    @Column
    private String role;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "default_delivery_address_id")
    private Address defaultDeliveryAddress;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "default_billing_address_id")
    private Address defaultBillingAddress;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Cart userCart;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private LoyaltyCard loyaltyCard;
}
