import {
  InterfaceDeclaration,
  TypeAliasDeclaration,
  EnumDeclaration,
  FunctionDeclaration,
  VariableDeclaration,
  ModuleDeclaration,
  Node,
  ts,
  JSDocStructure,
  OptionalKind,
  JSDoc,
  ClassDeclarationStructure,
  InterfaceDeclarationStructure,
} from "ts-morph";
import { ClassDeclaration } from "ts-morph";
import getJsDocsFromNode from "../utils/getJsDocsFromNode";
import { parse } from "comment-parser";
import { toJSON } from 'flatted';

type GenericNode = Node<ts.Node>;

type Declarations =
  | ClassDeclaration
  | InterfaceDeclaration
  | TypeAliasDeclaration
  | EnumDeclaration
  | FunctionDeclaration
  | VariableDeclaration
  | ModuleDeclaration;

type AstBuilderNode = Declarations | GenericNode;

type AstBuilderType = "Class" | "Interface" | "Type" | "Enum" | "Unknown";

type Structure = ReturnType<Declarations["getStructure"]>;

/**
 * A generic model for building a TsDocGen AST from a declaration.
 * @typeparam Type - The type of node
 * @typeparam Struct - The type of structure
 */
class AstBuilder<Type extends string = AstBuilderType, Struct extends Structure = Structure> {
  public node: AstBuilderNode;
  public type: string;
  public name: string;
  public declarations: Struct[];
  public docs: (OptionalKind<JSDocStructure> | string)[];
  public path: string;
  public structure: Struct | null;

  constructor(node: AstBuilderNode, type: Type) {
    // Variables
    this.node = node;
    this.type = type;
    this.name = this.getName();
    this.structure = this.getStructure();
    this.docs = this.getDocs();
    this.declarations = this.getDeclarations();
    this.path = this.node.getSourceFile().getDirectoryPath().replace(process.cwd(), '');

    // Side-effects
    this.normalizeJsDocsForStructure('methods');
    this.normalizeJsDocsForStructure('properties');
    this.getJsDocsForChildProperties();
  }

  /**
   * Converts this AST builder to a pure javascript object.
   * @returns The JSON representation of an AST Builder
   */
  public toJSON = () => {
    return toJSON({
      type: this.type,
      name: this.name,
      path: this.path,
      docs: this.docs,
      declarations: this.declarations,
    });
  }

  private getStructure = (): Struct | null => {
    return "getStructure" in this.node ? this.node.getStructure() as Struct : null;
  };

  /** A fallback name for when `node.getName()` returns undefined. */
  protected get fallbackName() {
    return this.node.getSymbol()?.getName() ?? "unknown";
  }

  /** Returns the name of the declaration */
  private getName = (): string => {
    return "getName" in this.node
      ? this.node.getName() ?? this.fallbackName
      : this.fallbackName;
  }

  private getDocs = (): (OptionalKind<JSDocStructure> | string)[] => {
    const jsDocs = getJsDocsFromNode(this.node);
    return this.normalizeJsDocs(jsDocs);
  }

  private getDeclarations(): Struct[] {
    if (this.structure) {
      return [
        {
          ...this.structure,
        },
      ];
    }
    return [];
  }

  private normalizeJsDocs = (
    docs: JSDoc[]
  ): (OptionalKind<JSDocStructure> | string)[] => {
    return docs.map((doc) => {
      const text = doc.getFullText();
      const parsedComments = parse(text);

      return {
        description: doc.getDescription(),
        tags: parsedComments[0].tags.map((tag) => {
          return {
            tagName: tag.name,
            text: tag.description
          }
        }),
      };
    });
  };

  /**
   * Determines if a node is a ClassDeclaration or a InterfaceDeclaration
   * @param node A Node.
   */
  private nodeIsClassOrInterface(
    node: any
  ): node is ClassDeclaration | InterfaceDeclaration {
    if (
      Node.isClassDeclaration(node) ||
      Node.isInterfaceDeclaration(node)
    ) {
      return true;
    }

    return false;
  }

  /**
   * Determines if an object is a ClassDeclarationStructure or a InterfaceDeclarationStructure
   * @param structure A DeclarationStructure or null.
   */
  private structureIsClassOrInterface(
    structure: any
  ): structure is ClassDeclarationStructure | InterfaceDeclarationStructure {
    if (!structure) return false;

    if ("properties" in structure) {
      return true;
    }

    return false;
  }

  private normalizeJsDocsForStructure(key: "properties" | "methods") {
    if (
      this.nodeIsClassOrInterface(this.node) &&
      this.structureIsClassOrInterface(this.structure)
    ) {
      const structures = this.structure[key] ?? [];

      for (let i = 0; i < structures.length; i++) {
        let jsDocs: JSDoc[] = [];

        switch (key) {
          case 'methods':
            jsDocs = this.node.getMethods()[i].getJsDocs();
            break;
          case 'properties':
            jsDocs = this.node.getProperties()[i].getJsDocs();
            break;
          default:
            break;
        }

        structures[i].docs = this.normalizeJsDocs(jsDocs);
      }
    }
  }

  private getJsDocsForChildProperties = () => {
    if (!this.nodeIsClassOrInterface(this.node)) {
      console.log((this.structure as any));
      const getChildProperties = this.getChildProperties();

      getChildProperties.forEach((childProperty) => {
        if (Node.isJSDocableNode(childProperty) && Node.isNamedNode(childProperty)) {
          
          const jsDocs = childProperty.getJsDocs();
          const docs = this.normalizeJsDocs(jsDocs);
          console.log(childProperty.getName());
          console.log(docs);
        }
      })
    }
  }

  private getChildProperties = () => {
    return this.node.getType().getProperties().map((property) => {
      return property.getValueDeclaration();
    });
  }
}

export default AstBuilder;
