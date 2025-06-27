package dd.projects.demo.attribute.option;

public class AttributeOptionNotFoundException extends RuntimeException {
    public AttributeOptionNotFoundException(Long id) {
        super("Attribute option with id " + id + " not found");
    }
}
