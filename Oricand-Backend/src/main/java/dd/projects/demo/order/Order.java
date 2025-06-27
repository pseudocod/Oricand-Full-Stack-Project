package dd.projects.demo.order;

import dd.projects.demo.address.Address;
import dd.projects.demo.orderitem.OrderItem;
import dd.projects.demo.paymenttype.PaymentType;
import dd.projects.demo.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "\"order\"")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user; 

    @Column(name = "guest_email", length = 255)
    private String guestEmail; 

    @Column(name = "guest_first_name", length = 100)
    private String guestFirstName;

    @Column(name = "guest_last_name", length = 100)
    private String guestLastName;

    @Column(name = "guest_phone", length = 20)
    private String guestPhone;

    @Column(name = "is_guest_order", nullable = false)
    @Builder.Default
    private Boolean isGuestOrder = false;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentType paymentType;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @Column(nullable = false)
    private LocalDate orderDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private Address deliveryAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    private Address invoiceAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.orderDate = LocalDate.now();
        if (this.status == null) {
            this.status = OrderStatus.PENDING;
        }
        this.isGuestOrder = (this.user == null && this.guestEmail != null);
    }

    public String getCustomerEmail() {
        return user != null ? user.getEmail() : guestEmail;
    }

    public String getCustomerFirstName() {
        return user != null ? user.getFirstName() : guestFirstName;
    }

    public String getCustomerLastName() {
        return user != null ? user.getLastName() : guestLastName;
    }

    public String getCustomerFullName() {
        return getCustomerFirstName() + " " + getCustomerLastName();
    }
}
