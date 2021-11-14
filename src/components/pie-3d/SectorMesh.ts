import { Color, CylinderBufferGeometry, DoubleSide, Mesh, MeshBasicMaterial, MeshPhongMaterial, Object3D } from "three";
import createSectorGeometry from "./createSectorGeometry";
import RectangleGeometry from "./RectangleGeometry";

//创建一个扇形3D对象
class SectorMesh extends Object3D {
    private geometries: [CylinderBufferGeometry, RectangleGeometry, RectangleGeometry]
    private _color: Color
    private _height: number

    constructor(radius: number, height: number, radialSegments: number, heightSegments: number, openEnded: boolean, thetaStart: number, thetaLength: number, color: Color) {
        super()
        this.type = 'SectorMesh'
        this.geometries = createSectorGeometry(radius, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength)
        this._color = color
        this._height = height

        this.update()
    }

    private update() {
        while (this.children.length > 0) {
            this.remove(this.children[0])
        }

        const cylinderMaterial = new MeshPhongMaterial({ color: this._color })
        const sideMaterial = new MeshBasicMaterial({ color: this._color, side: DoubleSide })
        this.geometries.forEach((geometry, index) => {
            if (index === 0) {
                this.add(new Mesh(geometry, cylinderMaterial))
            } else {
                this.add(new Mesh(geometry, sideMaterial))
            }
        })
    }

    public set color(value: Color) {
        this._color = value
        this.update()
    }

    public get color(): Color {
        return this._color
    }

    public get height(): number {
        return this._height
    }

}

export default SectorMesh
