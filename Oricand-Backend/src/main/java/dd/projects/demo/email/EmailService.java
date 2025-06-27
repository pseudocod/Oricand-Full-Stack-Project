package dd.projects.demo.email;

import dd.projects.demo.address.Address;
import dd.projects.demo.order.Order;
import dd.projects.demo.user.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Value("${app.admin.email:${spring.mail.username}}")
    private String adminEmail;

    public void sendWelcomeEmail(User user) {
        try {
            String subject = "Welcome to Oricând!";
            String template = loadTemplate("welcome");
            
            String content = template
                    .replace("${firstName}", user.getFirstName())
                    .replace("${lastName}", user.getLastName())
                    .replace("${email}", user.getEmail())
                    .replace("${loginUrl}", frontendUrl + "/login");

            sendHtmlEmail(user.getEmail(), subject, content);
            log.info("Welcome email sent to: {}", user.getEmail());
        } catch (IOException e) {
            log.error("Template not found for welcome email", e);
            throw EmailException.templateNotFound("welcome");
        } catch (MessagingException e) {
            log.error("Failed to send welcome email to: {}", user.getEmail(), e);
            throw EmailException.sendingFailed(user.getEmail(), e);
        }
    }

    public void sendOrderConfirmationEmail(Order order) {
        try {
            String subject = "Order Confirmation - Order #" + order.getId();
            String template = loadTemplate("order-confirmation");
            
            String content = template
                    .replace("${customerName}", order.getCustomerFullName())
                    .replace("${orderId}", order.getId().toString())
                    .replace("${orderDate}", order.getOrderDate().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy")))
                    .replace("${totalPrice}", formatPrice(order.getTotalPrice()))
                    .replace("${orderItems}", buildOrderItemsHtml(order))
                    .replace("${deliveryAddress}", formatAddress(order.getDeliveryAddress()))
                    .replace("${invoiceAddress}", formatAddress(order.getInvoiceAddress()))
                    .replace("${orderUrl}", frontendUrl + "/orders/" + order.getId());

            sendHtmlEmail(order.getCustomerEmail(), subject, content);
            log.info("Order confirmation sent to: {} for order: {}", order.getCustomerEmail(), order.getId());
        } catch (IOException e) {
            log.error("Template not found for order confirmation email", e);
            throw EmailException.templateNotFound("order-confirmation");
        } catch (MessagingException e) {
            log.error("Failed to send order confirmation for order: {}", order.getId(), e);
            throw EmailException.sendingFailed(order.getCustomerEmail(), e);
        }
    }

    public void sendPasswordResetEmail(User user, String resetToken) {
        try {
            String subject = "Reset Your Password";
            String template = loadTemplate("password-reset");
            
            String content = template
                    .replace("${firstName}", user.getFirstName())
                    .replace("${resetUrl}", frontendUrl + "/reset-password?token=" + resetToken);

            sendHtmlEmail(user.getEmail(), subject, content);
            log.info("Password reset email sent to: {}", user.getEmail());
        } catch (IOException e) {
            log.error("Template not found for password reset email", e);
            throw EmailException.templateNotFound("password-reset");
        } catch (MessagingException e) {
            log.error("Failed to send password reset email to: {}", user.getEmail(), e);
            throw EmailException.sendingFailed(user.getEmail(), e);
        }
    }

    public void sendForgotPasswordEmail(String email, String resetToken) {
        try {
            String subject = "Password Reset Request";
            String template = loadTemplate("forgot-password");
            
            String content = template
                    .replace("${email}", email)
                    .replace("${resetUrl}", frontendUrl + "/reset-password?token=" + resetToken);

            sendHtmlEmail(email, subject, content);
            log.info("Forgot password email sent to: {}", email);
        } catch (IOException e) {
            log.error("Template not found for forgot password email", e);
            throw EmailException.templateNotFound("forgot-password");
        } catch (MessagingException e) {
            log.error("Failed to send forgot password email to: {}", email, e);
            throw EmailException.sendingFailed(email, e);
        }
    }

    public void sendContactFormNotification(String customerName, String customerEmail, String message) {
        try {
            String subject = "[ADMIN ALERT] New Contact Form - " + customerName + " (" + customerEmail + ")";
            String template = loadTemplate("contact-notification");
            
            String content = template
                    .replace("${customerName}", customerName)
                    .replace("${customerEmail}", customerEmail)
                    .replace("${message}", message != null ? message : "No message provided")
                    .replace("${submissionTime}", java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("MMMM dd, yyyy 'at' HH:mm")));

            sendHtmlEmail(adminEmail, subject, content);
            log.info("Contact form notification sent for submission from: {}", customerEmail);
        } catch (IOException e) {
            log.error("Template not found for contact notification email", e);
            throw EmailException.templateNotFound("contact-notification");
        } catch (MessagingException e) {
            log.error("Failed to send contact form notification for: {}", customerEmail, e);
            throw EmailException.sendingFailed(adminEmail, e);
        }
    }

    public void sendContactFormConfirmation(String customerName, String customerEmail) {
        try {
            String subject = "Thank you for contacting Oricând!";
            String template = loadTemplate("contact-confirmation");
            
            String content = template
                    .replace("${customerName}", customerName)
                    .replace("${customerEmail}", customerEmail);

            sendHtmlEmail(customerEmail, subject, content);
            log.info("Contact form confirmation sent to: {}", customerEmail);
        } catch (IOException e) {
            log.error("Template not found for contact confirmation email", e);
            throw EmailException.templateNotFound("contact-confirmation");
        } catch (MessagingException e) {
            log.error("Failed to send contact form confirmation to: {}", customerEmail, e);
            throw EmailException.sendingFailed(customerEmail, e);
        }
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        message.setFrom(new InternetAddress(fromEmail));
        message.setRecipients(MimeMessage.RecipientType.TO, to);
        message.setSubject(subject);
        message.setContent(htmlContent, "text/html; charset=utf-8");
        mailSender.send(message);
    }

    private String loadTemplate(String templateName) throws IOException {
        String templatePath = "templates/email/" + templateName + ".html";
        ClassPathResource resource = new ClassPathResource(templatePath);
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    private String buildOrderItemsHtml(Order order) {
        StringBuilder html = new StringBuilder();
        order.getItems().forEach(item -> {
            html.append("<tr>")
                .append("<td class='product-name'>")
                .append(item.getProductName())
                .append("</td>")
                .append("<td class='quantity'>")
                .append(item.getQuantity())
                .append("</td>")
                .append("<td class='price'>")
                .append(formatPrice(item.getTotalPrice()))
                .append("</td>")
                .append("</tr>");
        });
        return html.toString();
    }

    private String formatPrice(BigDecimal price) {
        return String.format("$%.2f", price);
    }

    private String formatAddress(Address address) {
        if (address == null) {
            return "Address not provided";
        }
        
        StringBuilder sb = new StringBuilder();
        if (address.getStreetLine() != null) {
            sb.append(address.getStreetLine()).append("<br>");
        }
        if (address.getCity() != null) {
            sb.append(address.getCity());
            if (address.getPostalCode() != null) {
                sb.append(", ").append(address.getPostalCode());
            }
            sb.append("<br>");
        }
        if (address.getCounty() != null) {
            sb.append(address.getCounty()).append("<br>");
        }
        if (address.getCountry() != null) {
            sb.append(address.getCountry());
        }
        
        return sb.toString();
    }
}
