import {
  ClassDeclaration,
  EnumDeclaration,
  FunctionDeclaration,
  InterfaceDeclaration,
  Node,
  SyntaxKind,
  TypeAliasDeclaration,
  VariableDeclaration,
} from "ts-morph";
import ClassAstBuilder from "./builders/ClassAstBuilder";
import EnumAstBuilder from "./builders/EnumAstBuilder";
import FunctionAstBuilder from "./builders/FunctionAstBuilder";
import InterfaceAstBuilder from "./builders/InterfaceAstBuilder";
import TypeAstBuilder from "./builders/TypeAstBuilder";
import UnknownAstBuilder from "./builders/UnknownAstBuilder";
import VariableAstBuilder from "./builders/VariableAstBuilder";

function buildAST(node: Node) {
  const kind = node.getKind();

  switch (kind) {
    case SyntaxKind.ClassDeclaration:
      return new ClassAstBuilder(node as ClassDeclaration);
    case SyntaxKind.FunctionDeclaration:
      return new FunctionAstBuilder(node as FunctionDeclaration);
    case SyntaxKind.TypeAliasDeclaration:
      return new TypeAstBuilder(node as TypeAliasDeclaration);
    case SyntaxKind.InterfaceDeclaration:
      return new InterfaceAstBuilder(node as InterfaceDeclaration);
    case SyntaxKind.EnumDeclaration:
      return new EnumAstBuilder(node as EnumDeclaration);
    case SyntaxKind.VariableDeclaration:
      return new VariableAstBuilder(node as VariableDeclaration);
    default:
      return new UnknownAstBuilder(node);
  }
}

export default buildAST;
