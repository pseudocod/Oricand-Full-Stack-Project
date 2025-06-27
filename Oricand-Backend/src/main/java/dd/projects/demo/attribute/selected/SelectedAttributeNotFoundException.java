package dd.projects.demo.attribute.selected;

public class SelectedAttributeNotFoundException extends RuntimeException {
    public SelectedAttributeNotFoundException(Long id) {
        super("Selected attribute not found with id: " + id);
    }
}
