namespace CSDrawing {

    export class cGraphics {

        private graphics: Graphic = null;

        public getGraphics(): Graphic {
            return this.graphics;
        }

        public setGraphics(value: Graphic) {
            this.graphics = value;
        }

        public constructor(graphics: Graphic) {
            this.graphics = graphics;
        }

        public fillRoundRectangle(brush: Brush,
                                  x: number, y: number,
                                  width: number, height: number,
                                  radius: number) {
            this.fillRoundRectangleWithBrush(brush, x, y, width, height, radius);
        }

        public fillRoundRectangleWithBrush(brush: Brush, x: number, y: number, width: number, height: number, radius: number) {
            let rectangle: RectangleF = RectangleF.new4(x, y, width, height);
            let path = cGraphics.getRoundedRect(rectangle, radius);
            this.graphics.fillPath(brush, path);
        }

        public drawRoundRectangle(pen: Pen, x: number, y: number, width: number, height: number, radius: number) {
            let rectangle: RectangleF = RectangleF.new4(x, y, width, height);
            let path = cGraphics.getRoundedRect(rectangle, radius);
            this.graphics.drawPath(pen, path);
        }

        private static getRoundedRect(baseRect: RectangleF, radius: number) {
            // if corner radius is less than or equal to zero,
            // return the original rectangle
            if( radius <= 0 )  {
                let mPath = new GraphicsPath();
                mPath.addRectangle(baseRect);
                mPath.closeFigure();
                return mPath;
            }

            // if the corner radius is greater than or equal to
            // half the width, or height (whichever is shorter)
            // then return a capsule instead of a lozenge
            if(radius>=(Math.min(baseRect.getWidth(), baseRect.getHeight()))/2.0)
              return cGraphics.getCapsule( baseRect );

            // create the arc for the rectangle sides and declare
            // a graphics path object for the drawing
            let diameter: number = radius * 2.0;
            let sizeF = new SizeF( diameter, diameter );
            let arc: RectangleF = RectangleF.new2( baseRect.getLocation(), sizeF );
            let path: GraphicsPath = new GraphicsPath();

            // top left arc
            path.addArc( arc, 180, 90 );

            // top right arc
            arc.setX(baseRect.getRight()-diameter);
            path.addArc( arc, 270, 90 );

            // bottom right arc
            arc.setY(baseRect.getBottom()-diameter);
            path.addArc( arc, 0, 90 );

            // bottom left arc
            arc.setX(baseRect.getLeft());
            path.addArc( arc, 90, 90 );

            path.closeFigure();
            return path;
        }

        private static getCapsule(baseRect: RectangleF, diameter: number = 0, arc: RectangleF = null) {
            let path: GraphicsPath = new GraphicsPath();
            try  {
                if( baseRect.getWidth() > baseRect.getHeight() )  {
                    // return horizontal capsule
                    diameter = baseRect.getHeight();
                    let sizeF: SizeF = new SizeF(diameter, diameter);
                    arc = RectangleF.new2( baseRect.getLocation(), sizeF );
                    path.addArc(arc, 90, 180);
                    arc.setX(baseRect.getRight() - diameter);
                    path.addArc(arc, 270, 180);
                }
                else if( baseRect.getWidth() < baseRect.getHeight() )  {
                    // return vertical capsule
                    diameter = baseRect.getWidth();
                    let sizeF: SizeF = new SizeF(diameter, diameter);
                    arc = RectangleF.new2( baseRect.getLocation(), sizeF );
                    path.addArc(arc, 180, 180 );
                    arc.setY(baseRect.getBottom() - diameter);
                    path.addArc(arc, 0, 180 );
                }
                else {
                    // return circle
                    path.addEllipse( baseRect );
                }
            }
            catch(ignore) {
                path.addEllipse( baseRect );
            }
            finally
            {
                path.closeFigure();
            }
            return path;
        }
    }
}
