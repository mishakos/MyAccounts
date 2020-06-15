using System;
using System.Linq.Expressions;

namespace MyAccounts.Helpers.Specification
{
    public class And<T> : SpecificationBase<T>
    {
        readonly ISpecification<T> left;
        readonly ISpecification<T> right;

        public And(ISpecification<T> right, ISpecification<T> left)
        {
            this.right = right;
            this.left = left;
        }

        public override Expression<Func<T, bool>> SpecExpression
        {
            get
            {
                var objParam = Expression.Parameter(typeof(T), "obj");
                var newExpr = Expression.Lambda<Func<T, bool>>(
                    Expression.AndAlso(
                        Expression.Invoke(left.SpecExpression, objParam),
                        Expression.Invoke(right.SpecExpression, objParam)
                    ),
                    objParam
                );
                return newExpr;
            }
        }
    }
}
