<%@ taglib uri="aui" prefix="a" %>

<c:set var="footerText">
    <hza:string id="${vm.footerText}" languageCode="${ctx.languageCode}" />
</c:set>
<c:if test="${vm.showFooter}">
    <div class="tcw-info">
        <a:alert alertOrientation="inline">
            <div class="tcw-info-text">
                    ${footerText}
            </div>
        </a:alert>
    </div>
</c:if>
