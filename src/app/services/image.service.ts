import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private _validLeft: boolean;
  private _validRight: boolean;
  private _validTop: boolean;

  private _initDoorWidth: number;
  private _initDoorHeight: number;

  private _currentDoorWidth: number;
  private _currentDoorHeight: number;

  private _initLeftWidth: number;
  private _initRightWidth: number;
  private _initTopWidth: number;

  private _currentLeftWidth: number;
  private _currentRightWidth: number;
  private _currentTopWidth: number;

  private _initLeftHeight: number;
  private _initRightHeight: number;
  private _initTopHeight: number;

  private _currentLeftHeight: number;
  private _currentRightHeight: number;
  private _currentTopHeight: number;

  private _fullWidth: number;
  private _fullHeight: number;

  private _imageUrl;

  public image: HTMLElement;
  public imageElementGlass: HTMLElement;
  public imageElementGlass2: HTMLElement;
  public imageElementWalls: HTMLElement;
  public imageElementDoor: HTMLElement;
  public imageElementDoor2: HTMLElement;
  public imageElementTop: HTMLElement;
  public imageElementTopWall: HTMLElement;
  public imageElementLeft: HTMLElement;
  public imageElementRight: HTMLElement;
  public imageElementHinge: HTMLElement;
  public imageElementKare: HTMLElement;

  constructor() { }

  // IMAGE
  get imageUrl() {
    return this._imageUrl;
  }

  setImageUrl(value) {
    this._imageUrl = value;
  }

  // GETTERS WIDTHS
  get initDoorWidth(): number {
    return this._initDoorWidth;
  }

  get initLeftWidth(): number {
    return this._initLeftWidth;
  }

  get initRightWidth(): number {
    return this._initRightWidth;
  }
  get initTopWidth(): number {
    return this._initTopWidth;
  }

  get currentDoorWidth(): number {
    return this._currentDoorWidth;
  }

  get currentLeftWidth(): number {
    return this._currentLeftWidth;
  }

  get currentRightWidth(): number {
    return this._currentRightWidth;
  }

  get currentTopWidth(): number {
    return this._currentTopWidth;
  }

  get fullWidth(): number {
    return this._fullWidth;
  }

  // GETTERS HEIGHTS
  get initDoorHeight(): number {
    return this._initDoorHeight;
  }

  get initLeftHeight(): number {
    return this._initLeftHeight;
  }

  get initRightHeight(): number {
    return this._initRightHeight;
  }
  get initTopHeight(): number {
    return this._initTopHeight;
  }

  get currentDoorHeight(): number {
    return this._currentDoorHeight;
  }

  get currentLeftHeight(): number {
    return this._currentLeftHeight;
  }

  get currentRightHeight(): number {
    return this._currentRightHeight;
  }

  get currentTopHeight(): number {
    return this._currentTopHeight;
  }

  get fullHeight(): number {
    return this._fullHeight;
  }

  // SETTERS WIDTH
  setInitDoorWidth(value: number): void {
    this._initDoorWidth = value;
  }

  setInitLeftWidth(value: number): void {
    this._initLeftWidth = value;
  }

  setInitRightWidth(value: number): void {
    this._initRightWidth = value;
  }

  setInitTopWidth(value: number): void {
    this._initTopWidth = value;
  }

  setCurrentDoorWidth(value: number): void {
    this._currentDoorWidth = value;
  }

  setCurrentLeftWidth(value: number): void {
    this._currentLeftWidth = value;
  }

  setCurrentRightWidth(value: number): void {
    this._currentRightWidth = value;
  }

  setCurrentTopWidth(value: number): void {
    this._currentTopWidth = value;
  }

  setFullWidth(value: number): void {
    this._fullWidth = value;
  }

  // SETTERS HEIGHT
  setInitDoorHeight(value: number): void {
    this._initDoorHeight = value;
  }

  setInitLeftHeight(value: number): void {
    this._initLeftHeight = value;
  }

  setInitRightHeight(value: number): void {
    this._initRightHeight = value;
  }

  setInitTopHeight(value: number): void {
    this._initTopHeight = value;
  }

  setCurrentDoorHeight(value: number): void {
    this._currentDoorHeight = value;
  }

  setCurrentLeftHeight(value: number): void {
    this._currentLeftHeight = value;
  }

  setCurrentRightHeight(value: number): void {
    this._currentRightHeight = value;
  }

  setCurrentTopHeight(value: number): void {
    this._currentTopHeight = value;
  }

  setFullHeight(value: number): void {
    this._fullHeight = value;
  }

  // GETTERS VALID LEFT, RIGHT, TOP
  get validLeft(): boolean {
    return this._validLeft;
  }

  get validRight(): boolean {
    return this._validRight;
  }

  get validTop(): boolean {
    return this._validTop;
  }

  // SETTERS VALID LEFT, RIGHT, TOP
  setValidLeft(value: boolean): void {
    this._validLeft = value;
  }

  setValidRight(value: boolean): void {
    this._validRight = value;
  }

  setValidTop(value: boolean): void {
    this._validTop = value;
  }

  left = true;
  right = false;
  setValidLockLeft(b: boolean){
    this.left = b;
    this.right = !b;
  }

  setValidLockRight(b: boolean){
    this.right = b;
    this.left = !b;
  }

  get validLockLeft(){
    return this.left;
  }

  get validLockRight(){
    return this.right;
  }

  get lockleft(){
    return './assets/DIN/DIN RIGHT.jpg';
  }

  get lockright(){
    return './assets/DIN/DIN LEFT.jpg';
  }
}
