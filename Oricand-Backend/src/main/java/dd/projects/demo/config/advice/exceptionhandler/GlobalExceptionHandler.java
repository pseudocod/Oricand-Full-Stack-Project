package dd.projects.demo.config.advice.exceptionhandler;

import dd.projects.demo.address.exception.AddressNotFoundException;
import dd.projects.demo.address.exception.MissingAddressInformationException;
import dd.projects.demo.address.exception.UnauthorizedAddressAccessException;
import dd.projects.demo.attribute.option.AttributeOptionNotFoundException;
import dd.projects.demo.attribute.selected.SelectedAttributeNotFoundException;
import dd.projects.demo.attribute.type.AttributeTypeNotFoundException;
import dd.projects.demo.cart.exceptions.CartNotFoundException;
import dd.projects.demo.cart.exceptions.EmptyCartException;
import dd.projects.demo.cartentry.CartEntryNotFoundException;
import dd.projects.demo.category.exception.CategoryMediaStorageException;
import dd.projects.demo.category.exception.CategoryNotFoundException;
import dd.projects.demo.category.exception.DirectoryCreationException;
import dd.projects.demo.email.EmailException;
import dd.projects.demo.loyalty.exception.LoyaltyCardAlreadyExistsException;
import dd.projects.demo.loyalty.exception.LoyaltyCardNotFoundException;
import dd.projects.demo.order.GuestOrderValidationException;
import dd.projects.demo.order.InvalidOrderStatusTransitionException;
import dd.projects.demo.order.NotEnoughStockException;
import dd.projects.demo.order.OrderCancellationException;
import dd.projects.demo.order.OrderNotFoundException;
import dd.projects.demo.product.exception.ProductNotFoundException;
import dd.projects.demo.product.image.exception.ImageStorageException;
import dd.projects.demo.product.image.exception.InvalidFileTypeException;
import dd.projects.demo.product.image.exception.ProductImageNotFoundException;
import dd.projects.demo.security.exception.InvalidCredentialsException;
import dd.projects.demo.security.exception.InvalidRefreshTokenException;
import dd.projects.demo.security.exception.UserAuthenticationException;
import dd.projects.demo.user.exception.EmailAlreadyUsedException;
import dd.projects.demo.user.exception.InvalidTokenException;
import dd.projects.demo.user.exception.UserNotFoundException;
import dd.projects.demo.contact.exception.ContactMessageNotFoundException;
import dd.projects.demo.voting.exception.UserNotEligibleToVoteException;
import dd.projects.demo.voting.exception.VotingCampaignNotFoundException;
import dd.projects.demo.voting.exception.VotingOptionNotFoundException;
import dd.projects.demo.voting.exception.UserAlreadyVotedException;
import dd.projects.demo.voting.exception.VotingCampaignNotActiveException;
import dd.projects.demo.voting.exception.NoActiveCampaignException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<Object> handleCategoryNotFound(CategoryNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(AttributeTypeNotFoundException.class)
    public ResponseEntity<Object> handleAttributeTypeNotFound(AttributeTypeNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(AttributeOptionNotFoundException.class)
    public ResponseEntity<Object> handleAttributeOptionNotFound(AttributeOptionNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(SelectedAttributeNotFoundException.class)
    public ResponseEntity<Object> handleSelectedAttributeNotFound(SelectedAttributeNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(AddressNotFoundException.class)
    public ResponseEntity<Object> handleAddressNotFound(AddressNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFound(UserNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<Object> handleProductNotFound(ProductNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(CartEntryNotFoundException.class)
    public ResponseEntity<Object> handleCartEntryNotFound(CartEntryNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(CartNotFoundException.class)
    public ResponseEntity<Object> handleCartNotFound(CartNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(ProductImageNotFoundException.class)
    public ResponseEntity<Object> handleProductImageNotFound(ProductImageNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(DirectoryCreationException.class)
    public ResponseEntity<Object> handleDirectoryCreationException(DirectoryCreationException ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @ExceptionHandler(CategoryMediaStorageException.class)
    public ResponseEntity<Object> handleCategoryMediaStorageException(CategoryMediaStorageException ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @ExceptionHandler(InvalidFileTypeException.class)
    public ResponseEntity<String> handleInvalidFileType(InvalidFileTypeException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }


    @ExceptionHandler(ImageStorageException.class)
    public ResponseEntity<Object> handleImageStorageException(ImageStorageException ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<Object> handleEmailAlreadyUsed(EmailAlreadyUsedException ex) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Object> handleInvalidCredentials(InvalidCredentialsException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(MissingAddressInformationException.class)
    public ResponseEntity<Object> handleMissingAddressInformation(MissingAddressInformationException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(EmptyCartException.class)
    public ResponseEntity<Object> handleEmptyCart(EmptyCartException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedAddressAccessException.class)
    public ResponseEntity<Object> handleUnauthorizedAddressAccess(UnauthorizedAddressAccessException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(UserAuthenticationException.class)
    public ResponseEntity<String> handleAuthError(UserAuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    @ExceptionHandler(NotEnoughStockException.class)
    public ResponseEntity<Object> handleNotEnoughStock(NotEnoughStockException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(OrderCancellationException.class)
    public ResponseEntity<Object> handleOrderCancellation(OrderCancellationException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<Object> handleOrderNotFound(OrderNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(InvalidOrderStatusTransitionException.class)
    public ResponseEntity<Object> handleInvalidOrderStatusTransition(InvalidOrderStatusTransitionException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(GuestOrderValidationException.class)
    public ResponseEntity<Object> handleGuestOrderValidation(GuestOrderValidationException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<Object> handleEmailException(EmailException ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<Object> handleInvalidToken(InvalidTokenException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(InvalidRefreshTokenException.class)
    public ResponseEntity<Object> handleInvalidRefreshToken(InvalidRefreshTokenException ex) {
        return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
    }

    @ExceptionHandler(LoyaltyCardNotFoundException.class)
    public ResponseEntity<Object> handleLoyaltyCardNotFound(LoyaltyCardNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(LoyaltyCardAlreadyExistsException.class)
    public ResponseEntity<Object> handleLoyaltyCardAlreadyExists(LoyaltyCardAlreadyExistsException ex) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    // =====================
    // Contact Exceptions
    // =====================

    @ExceptionHandler(ContactMessageNotFoundException.class)
    public ResponseEntity<Object> handleContactMessageNotFound(ContactMessageNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    // =====================
    // Voting Exceptions
    // =====================

    @ExceptionHandler(VotingCampaignNotFoundException.class)
    public ResponseEntity<Object> handleVotingCampaignNotFound(VotingCampaignNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(VotingOptionNotFoundException.class)
    public ResponseEntity<Object> handleVotingOptionNotFound(VotingOptionNotFoundException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(NoActiveCampaignException.class)
    public ResponseEntity<Object> handleNoActiveCampaign(NoActiveCampaignException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(UserNotEligibleToVoteException.class)
    public ResponseEntity<Object> handleUserNotEligibleToVote(UserNotEligibleToVoteException ex) {
        return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage());
    }

    @ExceptionHandler(UserAlreadyVotedException.class)
    public ResponseEntity<Object> handleUserAlreadyVoted(UserAlreadyVotedException ex) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    @ExceptionHandler(VotingCampaignNotActiveException.class)
    public ResponseEntity<Object> handleVotingCampaignNotActive(VotingCampaignNotActiveException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgument(IllegalArgumentException ex) {
        return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: " + ex.getMessage());
    }

    private ResponseEntity<Object> buildResponse(HttpStatus status, String message) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);

        return new ResponseEntity<>(body, status);
    }
}
