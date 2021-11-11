import { BufferAttribute, BufferGeometry, Vector3 } from "three";

export type PositionArray = [number, number, number]
export type Point = Vector3 | PositionArray

//由 4 个顶点坐标组成的一个矩形
class RectangleGeometry extends BufferGeometry {

    private _leftTop: PositionArray
    private _rightTop: PositionArray
    private _rightBottom: PositionArray
    private _leftBottom: PositionArray

    private _vertices = new Float32Array()

    //由于本类只是向 BufferGeometry 设置了 position 值，并没有添加 normal 和 uv 值，所以严格意义上并不算一个完整的 BufferGeometry
    constructor(leftTop: Point, rightTop: Point, rightBottom: Point, leftBottom: Point) {
        super()
        this.type = 'RectangleGeometry'

        this._leftTop = this.pointToArray(leftTop)
        this._rightTop = this.pointToArray(rightTop)
        this._rightBottom = this.pointToArray(rightBottom)
        this._leftBottom = this.pointToArray(leftBottom)

        this.update()
    }

    private updateVertices() {
        this._vertices = new Float32Array([
            ...this._leftBottom,
            ...this._rightBottom,
            ...this._rightTop,

            ...this._rightTop,
            ...this._leftTop,
            ...this._leftBottom
        ])
    }

    private update() {
        this.updateVertices()
        this.setAttribute('position', new BufferAttribute(this._vertices, 3))
    }

    private pointToArray(point: Point): PositionArray {
        if (point instanceof Vector3) {
            return [point.x, point.y, point.z]
        } else {
            return point
        }
    }

    // get and set
    public get leftTop(): PositionArray {
        return this._leftTop
    }

    public set leftTop(point: PositionArray) {
        this._leftTop = point
    }

    public get rightTop(): PositionArray {
        return this._rightTop
    }

    public set rightTop(point: PositionArray) {
        this._rightTop = point
    }

    public get rightBottom(): PositionArray {
        return this._rightBottom
    }

    public set rightBottom(point: PositionArray) {
        this._rightBottom = point
    }

    public get leftBottom(): PositionArray {
        return this._leftBottom
    }

    public set leftBottom(point: PositionArray) {
        this._leftBottom = point
    }

    // public function
    public reset(leftTop: Point, rightTop: Point, rightBottom: Point, leftBottom: Point) {

        this._leftTop = this.pointToArray(leftTop)
        this._rightTop = this.pointToArray(rightTop)
        this._rightBottom = this.pointToArray(rightBottom)
        this._leftBottom = this.pointToArray(leftBottom)

        this.update()
    }
}

export default RectangleGeometry