package dd.projects.demo.attribute.type;

public class AttributeTypeNotFoundException extends RuntimeException {
    public AttributeTypeNotFoundException(Long id) {
        super("Attribute type with id " + id + " not found.");
    }
}
